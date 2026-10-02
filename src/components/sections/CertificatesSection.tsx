"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, ExternalLink, Plus, X } from "lucide-react";
import { KineticText } from "@/components/ui/KineticText";

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  credentialUrl: string;
}

export const CertificatesSection: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [hasLoadedCertificates, setHasLoadedCertificates] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    try {
      const savedCertificates = window.localStorage.getItem("portfolio-certificates");
      if (savedCertificates) {
        const parsedCertificates = JSON.parse(savedCertificates) as Certificate[];
        if (Array.isArray(parsedCertificates)) setCertificates(parsedCertificates);
      }
    } catch {
      window.localStorage.removeItem("portfolio-certificates");
    }
    setHasLoadedCertificates(true);
  }, []);

  useEffect(() => {
    if (hasLoadedCertificates) {
      window.localStorage.setItem("portfolio-certificates", JSON.stringify(certificates));
    }
  }, [certificates, hasLoadedCertificates]);

  const addCertificate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const issuer = String(formData.get("issuer") ?? "").trim();

    if (!name || !issuer) {
      setFormError("Enter the certificate name and issuing organization.");
      return;
    }

    setCertificates((current) => [
      ...current,
      {
        id: `${Date.now()}`,
        name,
        issuer,
        issueDate: String(formData.get("issueDate") ?? ""),
        credentialId: String(formData.get("credentialId") ?? "").trim(),
        credentialUrl: String(formData.get("credentialUrl") ?? "").trim(),
      },
    ]);
    setFormError("");
    setIsAddFormOpen(false);
    form.reset();
  };

  return (
    <section id="certificates" className="relative z-10 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 border border-cyber-cyan/30 bg-cyber-cyan/10 px-3 py-1.5 text-xs font-mono uppercase tracking-widest text-cyber-neon">
              <Award className="h-3.5 w-3.5" /> 05 // CREDENTIALS
            </div>
            <KineticText
              as="h2"
              text="Certificates"
              className="text-3xl font-display font-black text-white sm:text-5xl"
            />
            <p className="max-w-xl text-sm leading-relaxed text-gray-400">
              Verified learning, skills, and achievements.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsAddFormOpen(true)}
            className="inline-flex w-fit items-center gap-2 border border-cyber-cyan/50 bg-cyber-cyan/10 px-4 py-2.5 font-mono text-xs text-cyber-neon transition-colors hover:bg-cyber-cyan/20"
          >
            <Plus className="h-4 w-4" /> Add certificate
          </button>
        </div>

        {certificates.length === 0 ? (
          <div className="flex min-h-[280px] flex-col items-center justify-center border border-dashed border-white/20 px-6 py-12 text-center">
            <Award className="mb-4 h-8 w-8 text-cyber-cyan" />
            <h3 className="font-display text-xl font-bold text-white">No certificates added yet</h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-gray-400">
              Add a certificate to display it here. Your entries are saved in this browser.
            </p>
            <button
              type="button"
              onClick={() => setIsAddFormOpen(true)}
              className="mt-6 inline-flex items-center gap-2 border border-white/15 px-4 py-2.5 font-mono text-xs text-gray-300 transition-colors hover:border-cyber-cyan/60 hover:text-cyber-neon"
            >
              <Plus className="h-4 w-4" /> Add certificate
            </button>
          </div>
        ) : (
          <div className="divide-y divide-white/10 border-y border-white/10">
            {certificates.map((certificate, index) => (
              <motion.article
                key={certificate.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-cyber-cyan/25 bg-cyber-cyan/10 text-cyber-neon">
                    <Award className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="break-words font-display text-lg font-bold text-white">{certificate.name}</h3>
                    <p className="mt-1 text-sm text-gray-400">
                      {certificate.issuer}{certificate.issueDate ? ` · ${certificate.issueDate}` : ""}
                    </p>
                    {certificate.credentialId && (
                      <p className="mt-1 break-all font-mono text-xs text-gray-500">ID: {certificate.credentialId}</p>
                    )}
                  </div>
                </div>
                {certificate.credentialUrl && (
                  <a
                    href={certificate.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit shrink-0 items-center gap-2 font-mono text-xs text-cyber-neon hover:text-white"
                  >
                    View credential <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </motion.article>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {isAddFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
            <motion.form
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              onSubmit={addCertificate}
              className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto border border-cyber-cyan/30 bg-[#080B14] p-6 shadow-[0_0_60px_rgba(0,240,255,0.12)] sm:p-8"
            >
              <button
                type="button"
                onClick={() => setIsAddFormOpen(false)}
                aria-label="Close add certificate form"
                className="absolute right-5 top-5 text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
              <h3 className="pr-8 font-display text-2xl font-bold text-white">Add a certificate</h3>
              <p className="mt-1 text-sm text-gray-400">Add the credential details you want to display.</p>
              <div className="mt-6 grid gap-4">
                <label className="grid gap-1.5 text-xs font-mono uppercase text-gray-400">
                  Certificate name
                  <input name="name" required maxLength={120} className="border border-white/15 bg-black/40 px-3 py-2.5 text-sm normal-case text-white outline-none focus:border-cyber-cyan" />
                </label>
                <label className="grid gap-1.5 text-xs font-mono uppercase text-gray-400">
                  Issuing organization
                  <input name="issuer" required maxLength={120} className="border border-white/15 bg-black/40 px-3 py-2.5 text-sm normal-case text-white outline-none focus:border-cyber-cyan" />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-1.5 text-xs font-mono uppercase text-gray-400">
                    Issue date <span className="normal-case">(optional)</span>
                    <input name="issueDate" type="month" className="border border-white/15 bg-black/40 px-3 py-2.5 text-sm normal-case text-white outline-none focus:border-cyber-cyan" />
                  </label>
                  <label className="grid gap-1.5 text-xs font-mono uppercase text-gray-400">
                    Credential ID <span className="normal-case">(optional)</span>
                    <input name="credentialId" maxLength={120} className="border border-white/15 bg-black/40 px-3 py-2.5 text-sm normal-case text-white outline-none focus:border-cyber-cyan" />
                  </label>
                </div>
                <label className="grid gap-1.5 text-xs font-mono uppercase text-gray-400">
                  Credential link <span className="normal-case">(optional)</span>
                  <input name="credentialUrl" type="url" placeholder="https://" className="border border-white/15 bg-black/40 px-3 py-2.5 text-sm normal-case text-white outline-none focus:border-cyber-cyan" />
                </label>
              </div>
              {formError && <p role="alert" className="mt-4 text-sm text-rose-400">{formError}</p>}
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={() => setIsAddFormOpen(false)} className="px-4 py-2 text-sm text-gray-400 hover:text-white">Cancel</button>
                <button type="submit" className="inline-flex items-center gap-2 border border-cyber-cyan/50 bg-cyber-cyan/10 px-4 py-2 font-mono text-sm text-cyber-neon hover:bg-cyber-cyan/20">
                  <Plus className="h-4 w-4" /> Save certificate
                </button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};