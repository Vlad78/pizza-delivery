interface Props {
  params: {
    id: string
  }
}

const ProductPage = ({ params: { id } }: Props) => {
  return <div className={''}>Product {id}</div>
}

export default ProductPage
