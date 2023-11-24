import { Button } from '@mui/material';

/* eslint-disable react/no-unescaped-entities */
export default function AboutPage() {
  const handleButton = () => {
    window.electron.db.addItem('lost', 'awoo');
  };
  return (
    <div>
      <h1>Mitsukeru</h1>
      <p>Taken from japanese word "mitsukeru" which means "To found"</p>
      <Button variant="contained" onClick={() => handleButton()}>
        Test
      </Button>
    </div>
  );
}
