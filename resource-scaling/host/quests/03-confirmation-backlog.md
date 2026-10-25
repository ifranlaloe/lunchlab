# Quest 3 — confirmation backlog

Continue the same fictional system and the architecture participants left after [Quest 2](02-seat-reservations.md). Keep their catalog-read and reservation changes in place.

In the proposal table, `*` marks the preferred host route.

## From Quest 2

The protected reservation path now completes **80 purchases per minute, up from 30**. Each successful purchase creates one confirmation job. The existing workers could handle the old rate, but the new rate gives their branch more work. The asynchronous branch existed all along but was outside the starting C3 view. Add it to the group's evolving drawing before reading the new symptom:

```text
Checkout → Durable queue → 2 confirmation workers → Email provider
                           (render PDF, then send)
```

The purchase response does not wait for email. Jobs can be retried, so confirmation sends need a rule that prevents uncontrolled duplicates. Do not reveal which part of this branch is limiting until participants investigate.

## Participant brief

> Purchases are completing, but fans receive their confirmation emails increasingly late. The queue keeps growing. What would you like to inspect?

## Host-only cause

Rendering each PDF consumes substantial CPU. Use these **fictional exercise rates** when participants ask for numbers: 80 jobs arrive per minute after Quest 2; each worker can render 20 PDFs per minute; the email provider accepts 60 sends per minute. The two existing workers can render only 40 jobs per minute, so worker CPU is the first limit and the provider still has headroom. The Web/API and primary database are healthy.

## Questions participants may ask

| Component | Participant question | Host answer |
| --- | --- | --- |
| Web/API | Are purchases slow too? | Purchases complete normally. The response does not wait for confirmation. |
| Primary database | Is the primary database slow? | The purchase path and its database are healthy. |
| Durable queue | How many jobs arrive and finish? Is the queue broken? | 80 jobs arrive per minute; two workers render 40 per minute. The durable queue works, but backlog and oldest-job age grow. |
| Confirmation workers | Are worker CPU or memory saturated? | CPU is saturated; memory has headroom. Each worker renders 20 PDFs per minute. |
| Confirmation workers | What work in a confirmation worker creates the CPU limit? | Rendering a personalized PDF dominates each job. The two workers cannot render as fast as jobs arrive. |
| Confirmation workers | Can jobs run independently? What happens on retry? | Different purchase IDs can run on different workers. A job can retry; only one worker should claim it at a time, and sends need deduplication. |
| Email provider | Is the email provider already rate-limiting? | It accepts up to 60 sends per minute; only about 40 reach it initially. |

## Responses to proposals

| Component | Participant proposal | Host response in this quest |
| --- | --- | --- |
| Web/API | Make the API bigger (vertical) | The API is healthy and does not render PDFs. This does not change job completion rate. |
| Web/API | Add API replicas (horizontal) | More APIs do not speed up queued jobs and may increase arrivals. |
| Web/API | Limit new purchase intake | Fewer admitted jobs can stabilize the queue, with a product trade-off. |
| Durable queue | Enlarge the queue | Only buffers the same excess work; oldest-job age still grows. |
| Confirmation workers | Make workers bigger (vertical) | Give workers more CPU if that raises measured PDF renders per worker. Recalculate total render capacity before advancing. |
| **Confirmation workers**\* | **Add workers (horizontal)**\* | Grow from two to six independent workers with safe claims and retries. Potential rendering capacity rises from 40 to 120 jobs/minute. |
| Confirmation workers | Make PDF rendering cheaper | Optimize or simplify rendering if the measured per-job CPU cost falls. Recalculate total render capacity. |
| Confirmation workers | Partition jobs | Jobs are already independent by purchase ID. Partitioning can preserve ownership if needed, but adds no rendering capacity by itself. |

## Preferred host change — expand the worker pool

Once participants identify PDF rendering as the CPU-heavy step, draw **six workers instead of two**, all consuming from the same durable queue:

```text
Checkout → Durable queue → 6 independent workers → Email provider
                             (render PDF, then send)
```

1. Each worker claims a job so only one worker handles it at a time. Use the purchase ID to recognize retries and keep a durable send record; if the provider supports idempotency keys, pass that ID to it. Do not promise that an ordinary queue alone gives exactly-once email delivery.
2. At 20 renders per worker per minute, six workers have **potential render capacity of 120 per minute**, above the 80 new jobs per minute. This removes PDF rendering as the immediate limit. Keep the six-worker pool for Quest 4.
3. The provider still accepts only **60 sends per minute**. Once the workers offer sends faster than that, calls wait or receive rate-limit responses. The oldest unsent job can keep aging even though the pool can render more PDFs per minute.

For the preferred six-worker route, say: “We raised potential PDF rendering capacity from 40 to 120 jobs per minute. Yet confirmations are still late. What would you inspect next?” If the group chose another valid change, use its measured capacity instead. Then open Quest 4 and give its new symptom.

Giving workers more CPU or making rendering cheaper is also valid if potential rendering throughput rises above the provider's accepted send rate. Merely enlarging the queue changes how long jobs can wait, not how fast they finish.

## Handoff to Quest 4

Keep all earlier architecture changes, including the new worker capacity. Open [Quest 4 — email provider limit](04-email-provider.md) only when the chosen change raises potential rendering throughput **above 60 per minute**, so more send calls reach the provider under continued demand. With the preferred six-worker design, the provider caps completed sends at 60 per minute while 80 jobs per minute arrive: the backlog still grows by about 20 jobs per minute. A larger queue alone leaves worker CPU as the limit. Reducing admitted demand may stabilize the queue without exposing the provider limit.
