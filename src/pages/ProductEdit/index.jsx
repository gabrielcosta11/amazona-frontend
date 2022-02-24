import './style.scss'
import {Header, Footer} from '../components/Header&Footer/index.jsx'
import axios from 'axios'
import {DefaultButton} from '../components/DefaultButton/index.jsx'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { detailsProduct, updateProduct } from '../../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../../constants/productConstants'



function ProductEdit() {
    const history = useHistory();
    const dispatch = useDispatch();
    const {id: productId} = useParams();

    const productDetails = useSelector((state) => state.productDetails);
    const {product, loading, error} = productDetails;

    const productUpadte = useSelector(state => state.productUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate
    } =  productUpadte;

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        if(successUpdate) {
            history.push('/product-list')
        }

        if(!product || product._id !== productId || successUpdate) {
            dispatch({type: PRODUCT_UPDATE_RESET}) 
            dispatch(detailsProduct(productId))
        } else {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setCategory(product.category)
            setBrand(product.brand)
            setCountInStock(product.countInStock)
            setDescription(product.description)
        }
        
    }, [dispatch, productId, product, successUpdate, history]);

    const submitHandler = (e) => {
        e.preventDefault(); 

        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            category,
            brand,
            countInStock,
            description
        }));
    };

    const [uploadError, setUploadError] = useState();
    const userSignin = useSelector((state) => state.userSignin)
    const {userInfo} = userSignin
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        console.log(file)
        console.log(bodyFormData)

        try {
            console.log('foi')
            const {data} = await axios.post(
                '/api/uploads',
                bodyFormData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            
            window.alert('sucesso')
            setImage(data)
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className='container product-edit'>
            <Header/>
            <main>
                <form onSubmit={submitHandler}>
                    <h3>Editar Produto</h3>
                    <div className='field'>
                        <label htmlFor="name">Nome</label>
                        <input 
                            type="text"
                            id='name'
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='field'>
                        <label htmlFor="price">Preço</label>
                        <input 
                            type="number"
                            id='price'
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className='field'>
                        <label htmlFor="image">Imagem</label>
                        <input 
                            type="text"
                            id='image'
                            required
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </div>
                    <div className='field'>
                        <label htmlFor="image-file">Carregar Imagem</label>
                        <input 
                            type="file"
                            id='image-file'
                            label='Escolha a Imagem'
                            required
                            onChange={uploadFileHandler}
                        />
                    </div>
                    <div className='field'>
                        <label htmlFor="category">Categoria</label>
                        <input 
                            type="text"
                            id='category'
                            required
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>
                    <div className='field'>
                        <label htmlFor="brand">Marca</label>
                        <input 
                            type="text"
                            id='brand'
                            required
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        />
                    </div>
                    <div className='field'>
                        <label htmlFor="count-in-stock">Quantidade em estoque</label>
                        <input 
                            type="text"
                            id='count-in-stock'
                            required
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                        />
                    </div>
                    <div className='field'>
                        <label htmlFor="description">Descrição</label>
                        <textarea
                            type="text"
                            id='description'
                            rows='3'
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <DefaultButton type='submit'>Concluir</DefaultButton>
                </form>
            </main>
            <Footer></Footer>
        </div>
    )
};

export {ProductEdit}