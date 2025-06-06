import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Loader } from "@/components/ui/Loader";

export default function loading() {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Loading...</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Loader size={32} />
      </LayoutContent>
    </Layout>
  );
}
