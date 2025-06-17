import React, { useState, useEffect } from 'react';

const AssistantCard = ({ name, avatar, description, onSelect }) => {
  // Example: you can use useState/useEffect here if you want to add interactivity
  // const [selected, setSelected] = useState(false);
  // useEffect(() => { ... }, []);

  return (
    <div className='bg-[#181c2f]/90 rounded-3xl shadow-[0_0_32px_#822aff55] border-2 border-[#822aff44] flex flex-col items-center p-6 transition-transform hover:scale-105 hover:shadow-[0_0_48px_#00fff088]'>
      <img src={avatar} alt={name} className='w-24 h-24 rounded-full mb-4 border-4 border-[#00fff0]/40 shadow-lg bg-[#0f0026]' />
      <h2 className='text-2xl font-semibold text-[#00fff0] mb-2'>{name}</h2>
      <p className='text-[#bfaaff] text-center mb-4'>{description}</p>
      <button
        className='mt-auto px-6 py-2 rounded-xl bg-gradient-to-r from-[#822aff] to-[#00fff0] text-white font-bold shadow-md hover:from-[#00fff0] hover:to-[#822aff] transition-colors'
        onClick={onSelect}
      >
        Select
      </button>
    </div>
  );
};

export default AssistantCard;
