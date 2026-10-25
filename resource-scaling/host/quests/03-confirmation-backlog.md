# Quest 3 — confirmation backlog

Continue the same fictional system and the architecture participants left after [Quest 2](02-seat-reservations.md). Keep their catalog-read and reservation changes in place.

In the proposal table, `*` marks the preferred host route.

## From Quest 2

Start only when Quest 2's accepted change reduces lock waits without double-selling and **raises completed purchases**. Keep that change on the drawing. The preferred waiting room raises completions from 30 to **80 per minute**; use the group's measured result for another valid solution. Rebrief: “Your reservation fix worked. More purchases finish, and each one creates a confirmation job.”

The confirmation branch existed all along but was outside the starting C3 view. Add it to the group's drawing before reading the new symptom:

```text
Checkout → Durable queue → 2 confirmation workers → Email provider
                           (render PDF, then send)
```

The purchase response does not wait for email. Do not reveal which part of this branch is limiting until participants investigate.

## Participant brief

> Your reservation change worked: more purchases finish, and seats are still sold correctly. Fans now report that confirmation emails arrive increasingly late. The queue keeps growing. What would you like to inspect?

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

Once participants identify PDF rendering as the CPU-heavy step, cover four points:

| Cue | Host talking point |
| --- | --- |
| **Why** | 80 confirmation jobs arrive per minute, but two CPU-bound workers render only 40 PDFs per minute. The queue buffers the difference without increasing throughput. |
| **What** | Expand from two to six independent confirmation workers consuming from the same durable queue. Keep the earlier read-path and reservation changes. |
| **How** | Have one worker claim each job. Recognize retries by purchase ID and keep a durable send record; use provider idempotency keys if supported. The queue alone does not guarantee exactly-once sends. |
| **Proof** | Six workers can potentially render **120 PDFs per minute** at 20 each, above 80 arrivals. Rendering no longer limits the branch, but sends now wait or hit the provider's **60-per-minute** cap; oldest unsent-job age can still rise. |
