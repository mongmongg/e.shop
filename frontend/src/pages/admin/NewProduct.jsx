import Input from "../../components/Form/Input";
import PageContent from "../../components/shared/PageContent";
import Button from "../../components/UI/Button";
import { Link, useParams } from "react-router-dom";
import { useAddProduct, useProductById } from "../../hooks/useProduct";
import { useRef, useState } from "react";
import LoadingPage from "../LoadingPage";

export default function NewProduct() {
  const { pId } = useParams();
  const { data, isLoading } = useProductById({ pId });
  const { mutate: addNewProduct } = useAddProduct();
  const product = data?.product || undefined;

  const filePickerRef = useRef();
  const [selectedImage, setSelectedImage] = useState();
  const handlePickedImage = (event) => {
    if (event.target.files && event.target.files.length === 1) {
      const pickedFile = event.target.files[0];
      setSelectedImage(
        pickedFile ? URL.createObjectURL(pickedFile) : undefined,
      );
    }
  };
  const handleSaveNewProduct = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    addNewProduct({ data: formData, pId });
  };

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <PageContent header={pId ? "Edit Product" : "New Product"}>
      <form
        className="col-span-3 mx-auto min-w-100"
        onSubmit={handleSaveNewProduct}
        key={pId}
      >
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
        <Input
          label="Product Image"
          name="image"
          type="file"
          ref={filePickerRef}
          accept="image/jpeg, image/png"
          onChange={handlePickedImage}
          className="outline-none hidden"
        />
        <div className="flex justify-center items-center gap-4 py-4 border border-black/40">
          <img
            src={selectedImage}
            className={`w-30 h-30 object-cover ${!selectedImage ? "hidden" : ""}`}
            alt="preview"
          ></img>
          <Button
            onClick={() => filePickerRef.current.click()}
            type="button"
            className="my-4"
          >
            Choose image
          </Button>
        </div>
        <div className="mt-4 flex gap-2 justify-end">
          <Link to={-1}>
            <Button type="reset">Cancel</Button>
          </Link>
          <Button black>
            Save
          </Button>
        </div>
      </form>
    </PageContent>
  );
}
