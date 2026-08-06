# Catalog pages stay open; the Guest Book stays on the outbound link

Every Shelf, Catalog, and Skill Page is publicly readable and indexable, and Install Commands are copyable by anyone. The Guest Book remains exactly where it already was — on the outbound "View on GitHub" click — and is added to nothing new.

This reverses the direction of the immediately preceding work on this repository, which deliberately gated the UiPath Boost call to action behind the Guest Book, so a future reader will reasonably ask why the Catalog is ungated. The reason is that gating is fatal to the one thing a Catalog exists to do: a discovery surface hidden behind a form is invisible to search engines, to skills.sh, and to the Agents that would otherwise install from this domain. Gating an Install Command is additionally theatre, since it is one "view source" away from being read, and it taxes precisely the person we want adopting the work.

## Consequences

The Guest Book's conversion point is unchanged — it still captures the name of someone heading to the Upstream Repository — but it now reads as a courtesy ask on the way out rather than a paywall. No Skill Page sets `noIndex`. `GuestBookPopup` is event-driven and never self-opens, so the 35 new pages introduce no popup behaviour of their own.
