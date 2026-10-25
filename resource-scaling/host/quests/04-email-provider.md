# Quest 4 — email provider limit

Continue the same fictional system and the architecture participants left after [Quest 3](03-confirmation-backlog.md). Keep their accepted read-path, reservation, and worker changes in place.

In the proposal table, `*` marks the preferred host route.

## From Quest 3

The group increased potential PDF rendering throughput, so more jobs reach the send step. The email provider had headroom before; the additional completed work now exposes its contract limit. Keep the six-worker pool or the group's equivalent change on the drawing. Give participants only the new symptom below, then let them request provider evidence.

## Participant brief

> PDFs are being rendered at a higher total rate, but confirmation emails are still late. Some send attempts wait or retry. What would you inspect now?

## Host-only cause

The email provider has a fixed limit of 60 accepted sends per minute in this fictional contract. With the preferred six-worker path, potential render capacity is 120 per minute; use the group's measured value if it chose another Quest 3 fix. In either case rendering can offer more than 60 sends, but only 60 complete. Workers spend time waiting or backing off, so rendering CPU is no longer the limiting signal. At 80 arrivals per minute, the unsent backlog grows by about 20 jobs per minute.

## Questions participants may ask

| Component | Participant question | Host answer |
| --- | --- | --- |
| Web/API | Are purchases affected by slow email sends? | Purchases still complete; the response does not wait for email. |
| Durable queue | Is the backlog shrinking? | No. About 80 jobs arrive and at most 60 sends complete per minute, so unsent work grows by about 20 per minute. |
| Confirmation workers | Is rendering still the limit? | With six workers, per-job time is unchanged but total render capacity rose. For another accepted fix, use the group's measured rate. Workers now wait or back off from the provider. |
| Confirmation workers | Can a retry send twice? | Yes, unless the purchase ID and a durable send record control retries; use provider idempotency support if available. |
| Email provider | Are email-provider calls slower after the rendering change? | More PDFs can be rendered, but email sends wait or receive rate-limit responses. |
| Email provider | What does the provider return? | It accepts at most 60 sends per minute. Excess calls wait or receive rate-limit responses. |
| Email provider | What limits accepted sends at the provider? | The provider contract caps accepted sends. Blind retries add pressure without raising that cap. |

## Responses to proposals

| Component | Participant proposal | Host response in this quest |
| --- | --- | --- |
| Web/API | Slow new purchases | Fewer purchases would create fewer mandatory confirmations, but also restrict checkout. Make that product cost explicit. |
| Confirmation workers | Add more workers (horizontal) | More workers create more attempted sends against the same provider cap. |
| Confirmation workers | Delay confirmation | Already off the purchase response path. Further delay changes the promised delivery time, not provider capacity. |
| Email provider | Batch sends | Useful only if the contract accepts batches and counts them favorably. Verify that condition before reducing the claimed load. |
| Email provider | Cache provider responses | Each confirmation is a distinct send; caching a response cannot replace it. |
| **Email provider**\* | **Bound outbound sends**\* | Rate-gate to the provider's 60/minute allowance and back off on rate-limit responses. This protects the provider; it does not erase the backlog. |

## Preferred host response — protect the provider

- Put an **outbound rate gate** between the workers and provider so at most 60 sends per minute are offered. Honor retry timing instead of immediately repeating rejected calls.
- Keep unsent jobs durable. Use purchase IDs and a durable send record to limit duplicate confirmations; use provider idempotency support if available.
- Tell fans when confirmations are delayed and monitor the oldest unsent job. The gate protects the provider, but with 80 arrivals and at most 60 successful sends per minute, the backlog still grows by roughly **20 jobs per minute**.
- To drain the backlog, obtain verified send capacity **above 80 per minute**, such as a higher quota or another contracted provider, or admit fewer than 60 purchases per minute. Contract-supported batching may help if it counts favorably. Slowing purchases has a significant product cost.

Treat any higher quota as a change to confirm, not capacity the architecture already has. More workers alone increase provider pressure.

## Finish the path

Ask how the limiting cause changed from **worker CPU** to **provider rate limits** while oldest-job age remained a warning signal. The queue stayed in place as the bottleneck moved through the confirmation path. End when the group can name both the protective rate gate and the remaining throughput ceiling.
