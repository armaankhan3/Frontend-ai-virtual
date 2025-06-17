import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contaxt/UserContext';

const initialAssistants = [
	{
		name: 'Armaan',
		image: new URL('/src/assets/Armaan_Khan_i_just_want_you_to_make_some_like_6_or_7_images_fo_0633201f-c8c5-402a-815c-f40463145184.png', import.meta.url).href,
		description: 'A creative and friendly assistant for your daily needs.',
	},
	{
		name: 'Nova',
		image: new URL('/src/assets/Armaan_Khan_i_just_want_you_to_make_some_like_6_or_7_images_fo_554ea5b9-a89e-4fff-ad21-090fe9acc8fa.png', import.meta.url).href,
		description: 'Nova helps you organize and automate your workflow.',
	},
	{
		name: 'Pixel',
		image: new URL('/src/assets/Armaan_Khan_i_just_want_you_to_make_some_like_6_or_7_images_fo_86a594ea-a8b0-485a-82fc-6ffd19d2aa6b.png', import.meta.url).href,
		description: 'Pixel brings information to your fingertips.',
	},
	{
		name: 'Aura',
		image: new URL('/src/assets/Armaan_Khan_i_just_want_you_to_make_some_like_6_or_7_images_fo_b0e10809-17c2-44c0-b847-e9db342c7b82.png', import.meta.url).href,
		description: 'Aura keeps your mind and body in sync.',
	},
	{
		name: 'Zen',
		image: new URL('/src/assets/Armaan_Khan_i_just_want_you_to_make_some_like_6_or_7_images_fo_c7b7d578-95af-47bb-af02-952447f32fd9.png', import.meta.url).href,
		description: 'Zen offers mindfulness and stress relief tips.',
	},
	{
		name: 'Echo',
		image: new URL('/src/assets/Armaan_Khan_i_just_want_you_to_make_some_like_6_or_7_images_fo_ceb7337c-3a5a-4463-99e1-98fdd2c3b8f1.png', import.meta.url).href,
		description: 'Echo is your friendly reminder and scheduling assistant.',
	},
];

const Customize = () => {
	const [assistants, setAssistants] = useState(initialAssistants);
	const [selectedIdx, setSelectedIdx] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [uploadError, setUploadError] = useState('');
	const navigate = useNavigate();
	const { setUserdata, setAssistant } = useContext(UserContext);

	const handleNext = async () => {
		if (selectedIdx === null) return;
		const selected = assistants[selectedIdx];
		setUploading(true);
		setUploadError('');
		try {
			const formData = new FormData();
			formData.append('assistantName', selected.name);
			formData.append('assistantImage', selected.image);
			formData.append('description', selected.description || 'A creative and friendly assistant for your daily needs.');

			const uploadRes = await fetch('http://localhost:8000/api/user/update', {
				method: 'POST',
				credentials: 'include',
				body: formData,
			});
			if (!uploadRes.ok) throw new Error('Upload failed');
			const data = await uploadRes.json();
			setUserdata(data.user); // This ensures Home.jsx gets the latest assistant info
			navigate('/home'); // Go to Home after setting user data
		} catch (err) {
			setUploadError('Failed to save assistant.');
		} finally {
			setUploading(false);
		}
	};

	return (
		<div className='w-full min-h-screen bg-gradient-to-tr from-[#0f0c29] via-[#302b63] to-[#24243e] py-16 px-4 flex flex-col items-center relative'>
			{/* Home Button */}
			<button
				type='button'
				className='absolute top-8 left-8 flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#00fff0] to-[#822aff] text-white font-bold shadow-md hover:from-[#822aff] hover:to-[#00fff0] transition-colors z-20'
				onClick={() => navigate('/')}
				aria-label='Go to Home'
			>
				<span className='text-2xl'>&larr;</span>
				<span className='hidden sm:inline'>Home</span>
			</button>

			<h1 className='text-white text-4xl font-extrabold mb-12 tracking-wide'>
				NewWave Assistants
			</h1>

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-7xl w-full'>
				{assistants.map((assistant, idx) => (
					<div
						key={idx}
						className={`bg-white/10 backdrop-blur-md border ${
							selectedIdx === idx
								? 'border-[#00fff0] ring-4 ring-[#00fff0]/40'
								: 'border-white/20'
						} rounded-3xl overflow-hidden shadow-lg transition-transform hover:scale-[1.03] flex flex-col cursor-pointer`}
						onClick={() => setSelectedIdx(idx)}
					>
						<div className='w-full h-[420px]'>
							<img
								src={assistant.image}
								alt={assistant.name}
								className='w-full h-full object-cover'
							/>
						</div>
						<div className='p-6 text-center flex-1 flex flex-col justify-between'>
							<h2 className='text-2xl font-bold text-white mb-2'>{assistant.name}</h2>
							<p className='text-[#ddd] text-sm mb-6'>{assistant.description}</p>
							<button
								className='px-6 py-3 bg-gradient-to-r from-[#00fff0] to-[#822aff] rounded-xl text-white font-bold transition hover:from-[#822aff] hover:to-[#00fff0]'
								onClick={(e) => {
									e.stopPropagation();
									setSelectedIdx(idx);
								}}
							>
								{selectedIdx === idx ? 'Selected' : 'Select Assistant'}
							</button>
						</div>
					</div>
				))}
			</div>

			{/* New "Create Your Own Assistant" Button */}
			<button
				type='button'
				onClick={() => navigate('/customize')}
				className='mt-12 px-10 py-4 bg-gradient-to-r from-[#00fff0] to-[#822aff] rounded-2xl text-white text-xl font-bold shadow-lg hover:from-[#822aff] hover:to-[#00fff0] transition-all'
			>
				Create Your Own Assistant
			</button>

			{selectedIdx !== null && (
				<button
					disabled={uploading}
					onClick={async () => {
						await handleNext();
						navigate('/home');
					}}
					className='fixed bottom-8 left-1/2 -translate-x-1/2 px-16 py-4 rounded-2xl bg-gradient-to-r from-[#822aff] via-[#00fff0] to-[#822aff] text-white text-2xl font-extrabold shadow-[0_0_32px_#00fff088] animate-pulse border-4 border-[#00fff0]/40 hover:from-[#00fff0] hover:to-[#822aff] transition-all duration-200 z-50 disabled:opacity-60'
					style={{ letterSpacing: '0.1em' }}
				>
					{uploading ? 'Saving...' : 'Next →'}
				</button>
			)}

			{uploadError && (
				<p className='fixed bottom-24 left-1/2 -translate-x-1/2 text-red-400 font-bold z-50'>
					{uploadError}
				</p>
			)}
		</div>
	);
};

export default Customize;
