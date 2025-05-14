// pages/api/soaps.js
import supabase from '../../lib/supabaseClient';

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     const { data: soaps, error } = await supabase.from('soaps').select('id');
//     if (error) return res.status(500).json({ error: error.message });
//     res.status(200).json(soaps);
//   } else {
//     res.status(405).json({ error: 'Method not allowed' });
//   }
// }
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data: soaps, error } = await supabase
      .from('soaps')
      .select('id, name, price, description, category, fragrance, ingredients, skin_type, image');

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json(soaps);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}