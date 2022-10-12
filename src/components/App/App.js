import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OnlyScroll from 'only-scrollbar';
import GlobalStyles from 'GlobalStyles';
import {
  fetchImagesWithQuery,
  HITS_PER_PAGE,
} from '../../Services/fetchImages';
import Searchbar from '../Searchbar';
import Button from '../Button';
import ImageGallery from '../ImageGallery';
import ErrorMessage from '../ErrorMessage';
import Loader from '../Loader';
import { Container } from './App.styled';

// Creating an instance of a class OnlyScroll (adds inertia for increased smoothness)
new OnlyScroll(document.scrollingElement, {
  damping: 0.8,
});

export function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [endOfCollection, setEndOfCollection] = useState(false);

  useEffect(() => {
    if (query === '') {
      return;
    }
    setIsLoading(true);
    async function fetchImages() {
      try {
        const response = await fetchImagesWithQuery(query, page);
        const images = response.hits;
        validationData(images);
        const totalPages = Math.ceil(response.totalHits / HITS_PER_PAGE);
        checkEndCollection(page, totalPages);
        setItems(items => [...items, ...images]);
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchImages();
  }, [page, query]);

  const formSubmitHandler = data => {
    setPage(1);
    setQuery(data.search.trim());
    setItems([]);
    setIsLoading(false);
    setError(false);
    setEndOfCollection(false);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const validationData = data => {
    if (data.length === 0) {
      toast.warn(
        ' Sorry, there are no images matching your search query. Please try again.',
        {
          theme: 'colored',
        }
      );
    }
  };

  const checkEndCollection = (currentPage, total) => {
    if (currentPage === total) {
      setEndOfCollection(true);
      toast.info("We're sorry, but you've reached the end of search results.", {
        theme: 'colored',
      });
    }
  };

  return (
    <Container>
      <GlobalStyles />
      <Searchbar onSubmit={formSubmitHandler} />
      <ImageGallery items={items} />
      {error && <ErrorMessage />}
      {isLoading && <Loader />}
      {items.length > 0 && !endOfCollection && (
        <Button loadMore={loadMore} isSubmitting={isLoading} />
      )}
      <ToastContainer />
    </Container>
  );
}
