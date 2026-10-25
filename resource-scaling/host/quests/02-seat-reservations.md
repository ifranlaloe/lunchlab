# Quest 2 — hot seat reservations

Continue the same fictional system and the architecture participants left after [Quest 1](01-event-pages.md). Keep their accepted catalog-read change in place.

In the proposal table, `*` marks the preferred host route.

## From Quest 1

Start this quest only after Quest 1's accepted change lowers database read I/O or connection waits and event-page latency, while more completed browse flows reach reservation under continuing demand. A cache, query improvement, read replica, or larger database may have produced that result; keep the group's actual change on the drawing. If those signals have not improved, continue Quest 1.

Tell participants: “The event pages now respond faster, and more fans reach the purchase path.” Then give the new symptom below. Let them discover what limits purchases.

## Participant brief

> Event pages are responding better. Purchase attempts now slow down, especially when many fans choose the same seats. Some fans wait; others receive “unavailable.” Where would you look next?

## Host-only cause

Many attempts collide on a small set of popular seats while other seats remain available. Retries and lock waits waste write-path capacity, limiting completed purchases to **30 per minute** in this fictional exercise. Browse read pressure has fallen because of the group's earlier change; API CPU and payment have headroom. The existing confirmation workers could handle 40 jobs per minute, so they are not limiting yet. Correctness still holds: no seat is sold twice.

## Questions participants may ask

| Component | Participant question | Host answer |
| --- | --- | --- |
| Checkout | Is checkout slower now? | Event pages have improved. Purchase attempts for popular seats wait or return “unavailable.” No seat is double-sold. |
| Checkout | Where does a checkout trace spend its time? | At the inventory/reservation write, before payment. |
| Checkout | How many purchases actually finish? | About 30 per minute despite many more attempts; lock waits and retries consume the write path. |
| Web/API | Are API CPU or memory saturated? | They have headroom. More API replicas can admit more contenders but cannot create seats. |
| Primary database | What do database metrics show? | Catalog read pressure is lower; write/lock waits cluster on popular seats. |
| Payment provider | Is payment slow or rate-limited? | The provider is healthy at this point and is not causing the current wait. |
| Seat reservation | What creates Seat Reservation's write wait? | Multiple attempts compete for the same seats. The primary database coordinates the authoritative decision. |
| Seat reservation | Who owns a seat? Can a queue or cache promise one? | The primary database owns the decision. A waiting room admits attempts; a cached page or queued request cannot guarantee a seat or justify immediate confirmation. |

## Responses to proposals

| Component | Participant proposal | Host response in this quest |
| --- | --- | --- |
| Web/API | Make the API bigger (vertical) | API resources have headroom. A larger API does not shorten reservation write waits. |
| Web/API | Add API replicas (horizontal) | More attempts reach the same contended write path; the current limit stays. |
| Primary database | Make the database bigger (vertical) | May help a separately measured node limit. It does not remove competition for one seat by itself. |
| Primary database | Add a read replica | May help browsing, but the authoritative reservation write still has one owner. |
| Primary database | Partition seat writes | May raise throughput across independent seat groups with clear ownership. It cannot divide one hot seat; verify no double-selling. |
| Seat reservation | Shorten the reservation transaction | Consider if a trace shows avoidable work inside the transaction. The supplied evidence points to contention. |
| **Admission gate**\* | **Add a waiting room**\* | Gate attempts per event. Lock waits fall; the waiting line becomes visible. Successful purchases may rise if the old path wasted capacity on contention. |
| Checkout | Defer notifications | Confirmation already happens after purchase through a queue. Delaying it further does not shorten reservation write waits. |

## Preferred host change — gate reservation attempts

Once participants locate the wait at the primary database's seat-reservation write, draw this change on top of their Quest 1 design:

```text
Browsing → Event catalog → group's Quest 1 read-path change

Purchase attempt → Per-event waiting room → Seat reservation → Primary database
```

- **Limit admission:** Put a per-event gate before Seat Reservation. Admit only as many purchase attempts as the write path can finish without growing lock waits. Other fans wait outside checkout while browsing remains available.
- **Preserve ownership:** Admission grants an attempt, not a seat. The primary database still makes one atomic decision per seat; losing attempts get “unavailable.” Return expired or abandoned permits to the gate.
- **Observe both effects:** Lock waits and futile retries fall, and no seat is double-sold. The waiting-room length and oldest wait grow during the spike, so fans need a clear wait message.
- **Check throughput:** In this fictional on-sale, reducing thrash raises completed purchases from **30 to 80 per minute**. A gate does not guarantee this outcome in every system; ask for completed purchases per minute before claiming it.

For the preferred gate route, say: “The reservation path is stable and seat ownership remains correct. The waiting room is growing, but more purchases finish per minute. Where does the completed work go next?” If the group chose another valid change, describe its actual result instead.

Other proposals can work if they reduce measured lock time or safely separate ownership across independent seat groups. A single hot seat still needs one authoritative owner.

## Handoff to Quest 3

- Keep the group's Quest 1 read change and Quest 2 reservation change on the drawing. The waiting room remains a visible trade-off; do not treat it as extra ticket inventory.
- Move on only when lock waits fall, no seat is double-sold, and **successful purchases rise**. Use 80 purchases per minute as the fictional rate for the next quest. If a gate only reduces admitted demand without increasing completions, keep investigating Quest 2 rather than inventing a downstream bottleneck.
- At the start of [Quest 3 — confirmation backlog](03-confirmation-backlog.md), reveal the existing asynchronous confirmation branch and its new symptom. The higher completed-purchase rate now feeds that branch.
