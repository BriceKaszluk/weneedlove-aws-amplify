"use client";

import AuthenticatedLayout from '../layouts/AuthenticatedLayout';

export default function Dashboard() {
  return (
    <AuthenticatedLayout>
      <h2>Protected Page Content</h2>
      {/* Contenu de la page protégée */}
    </AuthenticatedLayout>
  );
}
