import shoe from '../../shoe.png';

const ProductDetail = ({product}) => {
    return (
        <div className='border p-2 rounded text-sm w-2/3 flex mr-2'>
            <div className='w-1/3 mr-2'>
                    <div className='mb-2'>
                        <h4 className='font-semibold'>Name</h4>
                        <p>{product.name}</p>
                    </div>
                    <div className='mb-2'>
                        <h4 className='font-semibold'>Description</h4>
                        <p>{product.description}</p>
                    </div>
                    <div className='mb-2'>
                        <h4 className='font-semibold'>Price</h4>
                        <p>${product.price}</p>
                    </div>
                    <div className='mb-2'>
                        <h4 className='font-semibold'>Stock</h4>
                        <p>{product.stock} items left</p>
                    </div>
                    <div className='mb-2'>
                        <h4 className='font-semibold'>Stock</h4>
                        <p>{product.stock} items left</p>
                    </div>
                    <div>
                        <h4 className='font-semibold'>Available Sizes</h4>
                        <div className='flex'>
                            {product.sizes.map(s => <button key={s.id} className='border rounded bg-gray-100 hover:bg-gray-200 px-2 py-1 mr-2' title={s.description}>{s.name}</button>)}
                        </div>
                    </div>
            </div>
            <div className='w-1/3 mr-2'>
                <div className='mb-2'>
                    <h4 className='font-semibold'>Sub Category</h4>
                    <p>{product.subCategory.name}</p>
                </div>
                <div className='mb-2'>
                    <h4 className='font-semibold'>Sub Category Description</h4>
                    <p>{product.subCategory.description}</p>
                </div>
            </div>
            <div className='text-center'>
                <img src={shoe} alt={product.name} className='h-72 w-72' />
            </div>
        </div>
    )
}

export default ProductDetail;