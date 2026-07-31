import { useEffect, useRef, useState } from "react";
import userData from "@constants/data";
import { GUEST_BOOK_OPEN_EVENT } from "@lib/guestBook";
import Icon from "./Icon";

const FOCUSABLE =
  'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';
const EMPTY_FORM = { name: "", email: "", company: "" };

export default function GuestBookPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [destination, setDestination] = useState("");
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const dialogRef = useRef(null);
  const nameInputRef = useRef(null);
  const isSubmittingRef = useRef(false);

  useEffect(() => {
    const handleOpen = (event) => {
      const nextDestination = event.detail?.destination;
      if (!nextDestination) return;

      setDestination(nextDestination);
      setFormData(EMPTY_FORM);
      setError("");
      isSubmittingRef.current = false;
      setIsSubmitting(false);
      setIsOpen(true);
    };

    window.addEventListener(GUEST_BOOK_OPEN_EVENT, handleOpen);
    return () => window.removeEventListener(GUEST_BOOK_OPEN_EVENT, handleOpen);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => nameInputRef.current?.focus(), 0);

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !isSubmittingRef.current) {
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll(FOCUSABLE)
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [isOpen]);

  const closeGuestBook = () => {
    if (!isSubmittingRef.current) setIsOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to sign the guest book");
      }

      window.location.assign(destination);
    } catch (requestError) {
      setError(requestError.message || "Unable to sign the guest book");
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center overflow-y-auto bg-[#0b1210]/70 p-4 backdrop-blur-sm sm:p-6">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        onClick={closeGuestBook}
        aria-label="Close guest book"
        tabIndex={-1}
      />
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="guest-book-title"
        aria-describedby="guest-book-description"
        className="relative z-10 w-full max-w-2xl overflow-hidden rounded-[1.75rem] border border-[#d8ddd8] bg-[#f8f7f3] shadow-[0_30px_90px_rgba(0,0,0,.32)] dark:border-[#46514c] dark:bg-[#111716]"
      >
        <div className="flex items-start justify-between gap-6 border-b border-[#d8ddd8] px-6 py-5 dark:border-[#34413d] sm:px-8">
          <p className="eyebrow">Before you continue</p>
          <button
            type="button"
            onClick={closeGuestBook}
            disabled={isSubmitting}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#c7cfca] text-[#46514c] transition hover:border-[#174b8b] hover:text-[#174b8b] disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#46514c] dark:text-[#c5cec8] dark:hover:border-[#a8c7ee] dark:hover:text-white"
            aria-label="Close guest book"
          >
            <Icon name="close" className="h-5 w-5" />
          </button>
        </div>

        <div className="grid lg:grid-cols-[.85fr_1.15fr]">
          <div className="bg-[#e9eff8] px-6 py-8 dark:bg-[#172c3c] sm:px-8 sm:py-10">
            <h2 id="guest-book-title" className="text-4xl sm:text-5xl">
              {userData.guestBook.title}
            </h2>
            <p
              id="guest-book-description"
              className="mt-5 leading-7 text-[#46514c] dark:text-[#c5cec8]"
            >
              {userData.guestBook.description}
            </p>
            <div className="mt-8 border-t border-[#b9cce5] pt-6 dark:border-[#315169]">
              <p className="text-sm font-semibold text-[#18211f] dark:text-[#eef1ed]">
                What happens next
              </p>
              <p className="mt-3 text-sm leading-6 text-[#5f6864] dark:text-[#b7c0bb]">
                After your information is saved, you’ll be redirected directly
                to UiPath Boost on GitHub.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-8 sm:px-8 sm:py-10">
            <div>
              <label htmlFor="guest-name" className="text-sm font-semibold">
                Name
              </label>
              <input
                ref={nameInputRef}
                id="guest-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                maxLength="120"
                required
                className="mt-2 min-h-[48px] w-full rounded-xl border border-[#c7cfca] bg-white px-4 text-[#18211f] placeholder:text-[#7a847e] focus:border-[#174b8b] focus:outline-none focus:ring-2 focus:ring-[#91aed2] dark:border-[#46514c] dark:bg-[#18211f] dark:text-[#eef1ed]"
                placeholder="Your name"
              />
            </div>
            <div className="mt-5">
              <label htmlFor="guest-email" className="text-sm font-semibold">
                Email
              </label>
              <input
                id="guest-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                maxLength="254"
                required
                aria-describedby="guest-email-note"
                className="mt-2 min-h-[48px] w-full rounded-xl border border-[#c7cfca] bg-white px-4 text-[#18211f] placeholder:text-[#7a847e] focus:border-[#174b8b] focus:outline-none focus:ring-2 focus:ring-[#91aed2] dark:border-[#46514c] dark:bg-[#18211f] dark:text-[#eef1ed]"
                placeholder="you@example.com"
              />
            </div>
            <div className="absolute -left-[10000px]" aria-hidden="true">
              <label htmlFor="guest-company">Company</label>
              <input
                id="guest-company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {error && (
              <p
                className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/50 dark:text-red-200"
                role="alert"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={
                isSubmitting || !formData.name.trim() || !formData.email.trim()
              }
              className="button-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Saving your information…" : "Continue to GitHub"}
              {!isSubmitting && <Icon name="arrowRight" />}
            </button>
            <p
              id="guest-email-note"
              className="mt-4 text-xs leading-5 text-[#7a847e] dark:text-[#96a09a]"
            >
              Your name and email will be stored in this portfolio’s connected
              guest-book database for occasional updates.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
