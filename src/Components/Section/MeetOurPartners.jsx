import React from 'react';

const MeetOurPartners = () => {
  const partners = [
    {
      name: 'Partner A',
      logo: 'https://via.placeholder.com/100',
      description: 'Providing excellent database services for seamless user experiences.',
    },
    {
      name: 'Partner B',
      logo: 'https://via.placeholder.com/100',
      description: 'Specialized in secure and fast cloud hosting solutions.',
    },
    {
      name: 'Partner C',
      logo: 'https://via.placeholder.com/100',
      description: 'Leading design services for a sleek and intuitive UI.',
    },
  ];

  return (
    <div className="bg-gray-100 py-10">
      <h2 className="text-center text-3xl font-bold mb-8">Meet Our Partners</h2>
      <div className="flex justify-center gap-8 flex-wrap">
        {partners.map((partner, index) => (
          <div key={index} className="bg-white shadow-lg p-6 rounded-lg text-center">
            <img
              src={partner.logo}
              alt={`${partner.name} logo`}
              className="mx-auto mb-4 w-24 h-24 object-contain"
            />
            <h3 className="text-xl font-semibold mb-2">{partner.name}</h3>
            <p className="text-gray-600">{partner.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetOurPartners;
