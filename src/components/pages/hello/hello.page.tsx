import { getTranslations } from "next-intl/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { requireAuthorized } from "@/lib/auth/server";

export async function HelloPage() {
  const t = await getTranslations("hello");
  const session = await requireAuthorized();

  return (
    <div className="grid h-screen place-items-center">
      <Card>
        <CardHeader>
          <CardTitle>{t("header.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base">
            {t.rich("content.greetings", {
              name: session.user.name,
              strong: (text) => (
                <strong className="font-semibold">{text}</strong>
              ),
            })}
          </CardDescription>
          <CardDescription className="text-base">
            {t("content.description")}
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
