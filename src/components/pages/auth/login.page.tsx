import { getTranslations } from "next-intl/server";
import { BsGoogle, BsPersonFill } from "react-icons/bs";
import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { requireUnauthorized } from "@/lib/auth/server";

export async function LoginPage() {
  await requireUnauthorized({ href: "/hello" });

  const t = await getTranslations("auth.login");

  return (
    <div className="grid h-screen place-items-center">
      <section className="space-y-2.5">
        <header>
          <h1 className="text-xl font-semibold">{t("header.title")}</h1>
          <p className="text-muted-foreground">{t("header.description")}</p>
        </header>

        <footer className="space-y-1.5 [&>button]:flex [&>button]:w-full">
          <LoginButton provider="google">
            <Button>
              <BsGoogle />
              <span>{t("buttons.google.label")}</span>
            </Button>
          </LoginButton>
          <LoginButton provider="anonymous">
            <Button>
              <BsPersonFill />
              <span>{t("buttons.anon.label")}</span>
            </Button>
          </LoginButton>
        </footer>
      </section>
    </div>
  );
}
