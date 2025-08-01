// api/uesers.js
const { createClient } = require('@supabase/supabase-js')

module.exports = async (req, res) => {
  try {
    // Kiểm tra environment variables
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_KEY
    
    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({ 
        error: 'Missing Supabase configuration',
        details: {
          hasUrl: !!supabaseUrl,
          hasKey: !!supabaseKey
        }
      })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // Chỉ cho phép GET request
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' })
    }

    const { data, error } = await supabase.from('users').select('*')
    
    if (error) {
      console.error('Supabase error:', error)
      return res.status(500).json({ error: error.message })
    }

    res.status(200).json(data)
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).json({ error: 'Internal server error', details: err.message })
  }
}
