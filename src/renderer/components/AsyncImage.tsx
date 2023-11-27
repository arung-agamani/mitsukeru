/* eslint-disable react/function-component-definition */
import React, { useEffect, useState } from 'react';

interface Props {
  id: string;
}

const AsyncImage: React.FC<Props> = ({ id }) => {
  const [imageData, setImageData] = useState('');

  useEffect(() => {
    (async () => {
      const data = await window.electron.db.getImage('lost', id);
      if (data) setImageData(data);
    })();
  }, [id]);

  if (!id) return <p>Invalid id given: Received {id}</p>;
  if (!imageData) return <p>Loading...</p>;
  return <img src={`data:image/png;base64,${imageData}`} alt={`${id}`} />;
};

export default AsyncImage;
