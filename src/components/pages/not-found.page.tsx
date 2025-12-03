import { getTranslations } from "next-intl/server";

export async function NotFoundPage() {
  const t = await getTranslations("notFound");

  return (
    <div className="grid h-screen place-items-center">
      <section>
        <header>
          <h1 className="text-xl font-semibold">{t("header.title")}</h1>
        </header>

        <main className="mt-2">
          <p>{t("main.description")}</p>
        </main>
      </section>
    </div>
  );
}
