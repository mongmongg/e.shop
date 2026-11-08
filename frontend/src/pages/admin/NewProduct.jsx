import Form from "../../components/Form/Form";
import Input from "../../components/Form/Input";
import PageContent from "../../components/shared/PageContent";
import Button from "../../components/UI/Button";
import { Link, useParams } from "react-router-dom";
import { useAddProduct, useProductById } from "../../hooks/useProduct";

export default function NewProduct() {
  const { pId } = useParams();
  const { data, isLoading } = useProductById({ pId });
  const { mutate: addNewProduct } = useAddProduct();
  const product = data?.product || undefined;

  const handleSaveNewProduct = (data) => {
    console.log(data);
    addNewProduct({ data });
  };
  return (
    <PageContent header="New Product">
      <Form className="col-span-3 mx-auto" onSubmit={handleSaveNewProduct}>
        <Input
          label="Product Name"
          name="name"
          placeholder="Product name"
          defaultValue={pId ? product.name : ""}
        />
        <Input
          label="Summary"
          name="summary"
          placeholder="summary"
          defaultValue={pId ? product.summary : ""}
        />
        <Input
          label="Description"
          name="description"
          textarea
          placeholder="description..."
          defaultValue={pId ? product.description : ""}
        />
        <div className="flex items-end gap-4">
          <Input
            label="Price"
            name="price"
            type="number"
            min="0"
            placeholder="0"
            defaultValue={pId ? product.price : ""}
          />
          <p className="my-4!">THB</p>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <img className="w-30 h-30 object-cover"></img>
          <Input
            name="image"
            type="file"
            accept="image/jpeg, image/png"
            className="outline-none"
          />
        </div>
        <div className="mt-4 flex gap-2 justify-end">
          <Link to="/admin">
            <Button type="reset">Cancel</Button>
          </Link>
          <Button className="bg-black text-white hover:bg-black/70">
            Save
          </Button>
        </div>
      </Form>
    </PageContent>
  );
}
