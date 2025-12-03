import { getTranslations } from "next-intl/server";

export async function AdminUsersPage() {
  const t = await getTranslations("admin.users");

  return (
    <section className="p-4">
      <header>
        <h1>{t("header.title")}</h1>
      </header>
    </section>
  );
}
