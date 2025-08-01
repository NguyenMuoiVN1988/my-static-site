// api/test-both-keys.js
module.exports = async (req, res) => {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_KEY
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY
  
  res.status(200).json({
    message: 'Testing both key names',
    results: {
      SUPABASE_URL: !!supabaseUrl,
      SUPABASE_KEY: !!supabaseKey,
      SUPABASE_ANON_KEY: !!supabaseAnonKey
    },
    previews: {
      url: supabaseUrl ? supabaseUrl.substring(0, 30) + '...' : 'NOT SET',
      key: supabaseKey ? supabaseKey.substring(0, 20) + '...' : 'NOT SET',
      anonKey: supabaseAnonKey ? supabaseAnonKey.substring(0, 20) + '...' : 'NOT SET'
    },
    allSupabaseKeys: Object.keys(process.env).filter(key => 
      key.toLowerCase().includes('supabase')
    )
  })
}
