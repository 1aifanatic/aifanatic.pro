export const GUEST_BOOK_OPEN_EVENT = "aifanatic:open-guest-book";

export function openGuestBook(destination) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent(GUEST_BOOK_OPEN_EVENT, {
      detail: { destination },
    })
  );
}
