import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import userData from "@constants/data";
import Icon from "./Icon";

const ACCESS_KEY = "aifanatic-guest-book-access";
const PROMPT_KEY = "aifanatic-guest-book-prompted";
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function GuestBookPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [memberName, setMemberName] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const nameInputRef = useRef(null);

  useEffect(() => {
    let savedAccess = null;
    try {
      savedAccess = JSON.parse(localStorage.getItem(ACCESS_KEY) || "null");
    } catch {
      localStorage.removeItem(ACCESS_KEY);
    }

    if (savedAccess?.granted) {
      setIsUnlocked(true);
      setMemberName(savedAccess.name || "");
      return undefined;
    }

    try {
      if (sessionStorage.getItem(PROMPT_KEY)) return undefined;

      const timer = window.setTimeout(() => {
        sessionStorage.setItem(PROMPT_KEY, "true");
        setIsOpen(true);
      }, 10000);

      return () => window.clearTimeout(timer);
    } catch {
      return undefined;
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      if (isUnlocked) {
        dialogRef.current?.querySelector(FOCUSABLE)?.focus();
      } else {
        nameInputRef.current?.focus();
      }
    }, 0);

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
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
  }, [isOpen, isUnlocked]);

  const openGuestBook = () => {
    setError("");
    setIsOpen(true);
  };

  const closeGuestBook = () => setIsOpen(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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

      const name = data.name || formData.name.trim();
      setMemberName(name);
      setIsUnlocked(true);
      try {
        localStorage.setItem(
          ACCESS_KEY,
          JSON.stringify({ granted: true, name, grantedAt: Date.now() })
        );
      } catch {
        // Access still works for this page view when storage is unavailable.
      }
    } catch (requestError) {
      setError(requestError.message || "Unable to sign the guest book");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={openGuestBook}
        className="fixed bottom-5 right-5 z-40 inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[#b9cce5] bg-[#174b8b] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(23,75,139,.28)] transition hover:-translate-y-0.5 hover:bg-[#0d376b] focus-visible:ring-2 focus-visible:ring-[#174b8b] focus-visible:ring-offset-2 motion-reduce:transform-none dark:border-[#527ba8] dark:bg-[#a8c7ee] dark:text-[#18211f] dark:hover:bg-white"
        aria-haspopup="dialog"
      >
        <span aria-hidden="true">{isUnlocked ? "✦" : "✎"}</span>
        {isUnlocked ? "Member links" : "Guest book"}
      </button>

      {isOpen && (
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
              <p className="eyebrow">A note from Naveen’s desk</p>
              <button
                type="button"
                onClick={closeGuestBook}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#c7cfca] text-[#46514c] transition hover:border-[#174b8b] hover:text-[#174b8b] dark:border-[#46514c] dark:text-[#c5cec8] dark:hover:border-[#a8c7ee] dark:hover:text-white"
                aria-label="Close guest book"
              >
                <Icon name="close" className="h-5 w-5" />
              </button>
            </div>

            {isUnlocked ? (
              <div className="px-6 py-8 sm:px-8 sm:py-10">
                <p className="eyebrow">Access unlocked</p>
                <h2 id="guest-book-title" className="mt-3 text-4xl sm:text-5xl">
                  Welcome{memberName ? `, ${memberName.split(" ")[0]}` : ""}.
                </h2>
                <p
                  id="guest-book-description"
                  className="mt-4 max-w-xl leading-7 text-[#5f6864] dark:text-[#b7c0bb]"
                >
                  Start with these hand-picked links. I’ll keep this collection
                  focused as new work and field notes are published.
                </p>
                <div className="mt-8 grid gap-3">
                  {userData.guestBook.content.map((item) => {
                    const content = (
                      <>
                        <span>
                          <span className="block font-serif text-xl text-[#18211f] dark:text-[#eef1ed]">
                            {item.title}
                          </span>
                          <span className="mt-1 block text-sm leading-6 text-[#5f6864] dark:text-[#b7c0bb]">
                            {item.description}
                          </span>
                        </span>
                        <Icon
                          name={item.internal ? "arrowRight" : "arrowUpRight"}
                          className="h-5 w-5 shrink-0 text-[#174b8b] dark:text-[#a8c7ee]"
                        />
                      </>
                    );
                    const classes =
                      "flex min-h-[86px] items-center justify-between gap-4 rounded-2xl border border-[#d8ddd8] bg-white px-5 py-4 transition hover:-translate-y-0.5 hover:border-[#91aed2] dark:border-[#34413d] dark:bg-[#18211f] motion-reduce:transform-none";

                    return item.internal ? (
                      <Link key={item.href} href={item.href} className={classes}>
                        {content}
                      </Link>
                    ) : (
                      <a
                        key={item.href}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={classes}
                      >
                        {content}
                      </a>
                    );
                  })}
                </div>
              </div>
            ) : (
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
                      Inside the collection
                    </p>
                    <ul className="mt-4 space-y-3 text-sm leading-6 text-[#5f6864] dark:text-[#b7c0bb]">
                      <li>UiPath Boost’s practical starter path</li>
                      <li>Applied AI architecture and case studies</li>
                      <li>Direct access to Naveen’s Substack</li>
                    </ul>
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
                      tabIndex="-1"
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
                    {isSubmitting ? "Signing the guest book…" : "Unlock the collection"}
                    {!isSubmitting && <Icon name="arrowRight" />}
                  </button>
                  <p
                    id="guest-email-note"
                    className="mt-4 text-xs leading-5 text-[#7a847e] dark:text-[#96a09a]"
                  >
                    Your details are saved to this portfolio’s guest list for
                    occasional updates. Substack signup remains your choice.
                  </p>
                </form>
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
}
