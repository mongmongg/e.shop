import PageContent from "../../components/shared/PageContent";
import Products from "../Products";

export default function AdminProducts() {
  return (
    <PageContent header="Products">
      <div className="col-span-3">
        <Products />
      </div>
    </PageContent>
  );
}
