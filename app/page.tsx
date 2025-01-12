import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div>
      <Card>
        <CardHeader className="flex justify-center items-center">
          <CardTitle>Bienvenue sur mon site !!</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
