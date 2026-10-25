# Quest 4 — email provider limit

Continue the same fictional system and the architecture participants left after [Quest 3](03-confirmation-backlog.md). Keep their accepted read-path, reservation, and worker changes in place.

In the proposal table, `*` marks the preferred host route.

## From Quest 3

Start only when Quest 3's accepted change raises potential rendering throughput **above 60 PDFs per minute**, so more sends reach the next step. More CPU per worker or cheaper rendering can also work; a larger queue alone cannot. Keep the six-worker pool or the group's actual change on the drawing. Rebrief: “Your rendering fix worked. More PDFs are ready to send, but users still report late confirmations.” Give participants the new symptom below and let them request provider evidence.

## Participant brief

> Your rendering change worked: PDFs are rendered faster. Fans still report late confirmation emails, and some send attempts wait or retry. What would you inspect now?

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

## Preferred host change — protect the provider

Once participants identify the provider's contract limit, cover four points:

| Cue | Host talking point |
| --- | --- |
| **Why** | The provider accepts at most 60 sends per minute while 80 confirmation jobs arrive. More workers only add attempts and retries against that cap. |
| **What** | Put an outbound rate gate between the workers and provider. Keep excess confirmation jobs on the durable queue and tell fans when email is delayed. |
| **How** | Offer no more than 60 sends per minute, honor retry timing, and use purchase IDs plus a durable send record to limit duplicates. Use provider idempotency support if available. |
| **Proof** | Rate-limit errors and futile retries fall, but at 80 arrivals and 60 completed sends the backlog still grows by about **20 jobs per minute**. Track oldest-job age; the gate protects the provider but does not add send capacity. |

## Finish the path

Ask how the limit moved from **worker CPU** to **provider rate limits** while oldest-job age remained a warning signal. To drain the backlog, the group needs verified send capacity above 80 per minute, contract-supported batching that raises effective capacity, or fewer than 60 new jobs per minute; reducing purchases has a product cost. Treat a higher quota as a proposal to verify, not existing capacity. End when the group can name both the protective rate gate and the remaining throughput ceiling.
