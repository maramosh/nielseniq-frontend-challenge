import React, { useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Swal from 'sweetalert2';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

const ModalBackground = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	backdrop-filter: blur(5px);
	display: flex;
	justify-content: center;
	align-items: center;
	animation: ${fadeIn} 0.3s ease-out;
`;

const ModalContainer = styled.div`
	background: #fff;
	padding: 20px;
	border-radius: 16px;
	width: 100%;
	max-width: 800px;
	position: absolute;
	bottom: 0;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;

	@media (max-width: 767px) {
		transform: translateY(100%);
		animation: ${slideIn} 0.3s ease-out forwards;
	}

	@media (min-width: 768px) {
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		flex-direction: row;
		padding: 40px;
		justify-content: center;
		max-width: 1000px;
		height: fit-content;
	}
`;
const ModalImage = styled.img`
	width: 100%;
	height: auto;
	max-width: 300px;
	max-height: 300px;
	border-radius: 16px;
	margin-bottom: 20px;

	@media (min-width: 768px) {
		width: auto;
		height: auto;
		margin-bottom: 0;
		margin-right: 20px;
	}
`;

const ModalContent = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const ModalTitle = styled.h2`
	font-size: 24px;
	text-align: center;
`;

const TextInput = styled.textarea`
	width: 100%;
	height: 150px;
	border-radius: 16px;
	border: 1px solid #ccc;
	padding: 10px;
	box-sizing: border-box;
	resize: none;
	font-size: 14px;
	margin-top: 20px;
`;

const Button = styled.button`
	width: 100%;
	background: #0077cc;
	color: #fff;
	border: none;
	border-radius: 8px;
	padding: 10px;
	cursor: pointer;
	font-size: 16px;
	margin-top: 10px;
	transition: background 0.3s, box-shadow 0.3s;

	&:hover {
		background: #005fa3;
		box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
	}

	@media (min-width: 768px) {
		width: 50%;
	}
`;

const ButtonContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
`;

const LoadingText = styled.p`
	font-size: 16px;
    width: 100%;
	height: auto;
	max-width: 300px;
	max-height: 300px;
	text-align: center;
`

const Modal = ({ isOpen, data, onSave, onClose }) => {
	const descriptionRef = useRef();

	const [isLoading, setIsLoading] = useState(true);
	const [imageError, setImageError] = useState(false);

	if (!isOpen) {
		return null;
	}

	const handleImageLoad = () => {
		setIsLoading(false);
	};

	const handleImageError = () => {
		setImageError(true);
		setIsLoading(false);
	}

	const handleSave = () => {
		if (!!descriptionRef.current.value) {
			onSave(descriptionRef.current.value, data.id);
		} else {
			Swal.fire({
				icon: 'error',
				title: 'Description cannot be empty',
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};

	const handleClose = () => {
		if (!!descriptionRef.current.value) {
			Swal.fire({
				icon: 'warning',
				title: 'Are you sure you want to close the modal?',
				showCancelButton: true,
				confirmButtonText: 'Yes',
				cancelButtonText: 'No',
			}).then((result) => {
				if (result.isConfirmed) {
					handleResetState();
					onClose();
				}
			});
		} else {
			handleResetState();
			onClose();
		}
	}

	const handleResetState = () => {
		setIsLoading(true);
		setImageError(false);
		descriptionRef.current.value = '';
	}



	return (
		<ModalBackground data-testid="modal-component">
			<ModalContainer>
				{isLoading && <LoadingText>Loading Image...</LoadingText>}
				<ModalImage src={imageError ? '/error-image-generic.png' : data.url} alt={data?.title} onLoad={handleImageLoad} onError={handleImageError} />
				<ModalContent>
					<ModalTitle>{data?.title}</ModalTitle>
					<TextInput
						defaultValue={data?.description}
						placeholder='Add a description'
						ref={descriptionRef}
					/>
					<ButtonContainer>
						<Button onClick={handleSave}>Save</Button>
						<Button onClick={handleClose}>Close</Button>
					</ButtonContainer>
				</ModalContent>
			</ModalContainer>
		</ModalBackground>
	);
};

export default Modal;
