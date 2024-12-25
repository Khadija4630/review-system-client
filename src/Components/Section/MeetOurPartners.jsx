import React from 'react';
import Partner1 from '../../assets/partner1.jpeg';
import Partner2 from '../../assets/partner2.png';
import Partner3 from '../../assets/partner3.jpeg';
import Partner4 from '../../assets/partner4.png';

const MeetOurPartners = () => {
  const partners = [
    {
      name: 'Partnered With Google',
      logo: Partner1,
      description: 'Providing excellent database services for user  experiences.',
    },
    {
      name: 'Partnered With Apple',
      logo: Partner2,
      description: 'Specialized in secure tech and fast cloud hosting solutions.',
    },
    {
      name: 'Partnered With Microsoft',
      logo: Partner3,
      description: 'Leading design services for a sleek tech and intuitive UI.',
    },
    {
      name: 'Partnered With Amazon',
      logo: Partner4,
      description: 'Offering top-notch e-commerce solutions for shopping.',
    }
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
