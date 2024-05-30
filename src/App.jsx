import { useContext, useEffect, useState } from 'react';
import { useGetPhotos } from './api/home.requests';
import Card from './components/card';
import GridContainer from './components/grid-container';
import RootContainer from './components/root-container';
import Navbar from './components/navbar';
import Modal from './components/modal';
import Swal from 'sweetalert2';
import { AppContext } from './utils/appContext';
import ErrorLoading from './components/error-loading';

function App() {
	const [photos, setPhotos] = useState([]);
	const [selectedPhoto, setSelectedPhoto] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const { errorLoading } = useContext(AppContext);

	const getPhotos = useGetPhotos();

	useEffect(() => {
		fetchPhotos();
	}, []);

	useEffect(() => {
		if (selectedPhoto !== null) {
			setIsModalOpen(true);
		}
	}, [selectedPhoto]);

	const fetchPhotos = async () => {
		try {
			const response = await getPhotos();
			const updatedPhotos = response.reduce((acc, photo) => {
				const description = localStorage.getItem(photo.id);
				acc.push({ ...photo, description: description || photo.description });
				return acc;
			}, []);
			setPhotos(updatedPhotos);
		} catch (e) {
			console.error('Error loading photos -->', e);
		}
	};

	const handleSelectCard = (data) => {
		setSelectedPhoto(data);
	};

	const handleSave = (description, id) => {
		localStorage.setItem(id, description);
		const updatedPhotos = photos.reduce((acc, photo) => {
			if (photo.id === id) {
				acc.push({ ...photo, description });
			} else {
				acc.push(photo);
			}
			return acc;
		}, []);
		setPhotos(updatedPhotos);
		setIsModalOpen(false);
		Swal.fire({
			icon: 'success',
			title: 'Description saved!',
			showConfirmButton: false,
			timer: 1500,
		});
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedPhoto(null);
	};

	return (
		<RootContainer data-testid="app-component">
			<Navbar />
			{errorLoading ? <>
				<ErrorLoading onClick={fetchPhotos} />
			</> :
				<GridContainer>
					{photos.map((photo) => (
						<Card
							key={photo.id}
							title={photo.title}
							description={photo.description}
							thumbnailUrl={photo.thumbnailUrl}
							onClick={() => handleSelectCard(photo)}
						/>
					))}
				</GridContainer>
			}
			<Modal
				isOpen={isModalOpen}
				data={selectedPhoto}
				onClose={handleCloseModal}
				onSave={handleSave}
			/>
		</RootContainer>
	);
}

export default App;