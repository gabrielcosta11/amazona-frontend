import "./style.scss"
import {Header} from '../components/Header&Footer/index.jsx'
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { createProduct, deleteProduct, listProducts } from "../../actions/productActions";
import {DefaultButton} from '../components/DefaultButton/index.jsx'
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_RESET } from "../../constants/productConstants";
import { useHistory } from "react-router-dom";

function ProductList() {
    const history = useHistory()
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const {products, loading, error} = productList;
    const productCreate = useSelector((state) => state.productCreate);
    const {
        loading: loadingCreate,
        product: createdProduct,
        error: errorCreate,
        success: successCreate,
    } = productCreate;
    const productDelete = useSelector(state => state.productDelete)
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete

    useEffect(() => {
        if(successCreate) {
            dispatch({type: PRODUCT_CREATE_RESET})
            history.push(`/product/${createdProduct.product._id}/edit`)
        };

        if(successDelete) {
            dispatch({type: PRODUCT_DELETE_RESET})
            window.alert('Produto Deletado')
        }

        dispatch(listProducts())
    }, [dispatch, successCreate, createdProduct, history, successDelete]);

    const createHandler = () => {
        dispatch(createProduct());
    };

    const deleteHandler = (product) => {
        if(window.confirm('Você tem certeza que deseja deletar este produto?')) {
            dispatch(deleteProduct(product._id))
        }
    }

    return (
        <div className="container list-products">
            <Header></Header>
            <main>
                <div>
                    <h3>Lista de Produtos</h3>
                    <DefaultButton onClick={createHandler}>Criar Produto</DefaultButton>
                </div>
                <table>
                    <thead>
                        <tr className="row">
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Categoria</th>
                            <th>Marca</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>
                                        {
                                            product.price.toLocaleString("pt-BR", {style: "currency", currency:"BRL"})
                                        }
                                    </td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td className="actions">
                                        <button onClick={() => history.push(`/product/${product._id}/edit`)}>Editar</button>
                                        <button 
                                        className="delete"
                                        onClick={() => deleteHandler(product)}
                                        >
                                            Deletar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </main>
        </div>
    )
};

export {ProductList}