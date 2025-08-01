// api/students.js
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

module.exports = async (req, res) => {
  const { data, error } = await supabase.from('users').select('*')

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.status(200).json(data)
}
