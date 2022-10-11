module.exports = {
  env: {
    DB_LOCAL_URI: "mongodb://0.0.0.0:27017/",
    DB_URI: 'mongodb+srv://Mtalii:kakitu2021@cluster0.qs2rbc7.mongodb.net/?retryWrites=true&w=majority',

    STRIPE_API_KEY: 'pk_test_51Lp5WEEMnCAQAhVdgsdP9CLGHS5qkN1Q4lOQP4Jh2kzZqrh2pgtoK6Z71s1MO38k2quXkzJsToZiOoS46jyTUw5000cJ3tt4Dp',

    STRIPE_SECRET_KEY: 'whsec_woVF3IAqYI6KKxlMrmz6kyaa4LDHpKPB',

    CLOUDINARY_CLOUD_NAME: 'dyemjook1',
    CLOUDINARY_API_KEY: '171949296453622',
    CLOUDINARY_API_SECRET: 'bL6XbPZDaEKZ96xCY4l8Ygjqajs',

    SMTP_HOST: 'smtp.mailtrap.io',
    SMTP_PORT: '2525',
    SMTP_USER: '7ba77ffa3b1baa',
    SMTP_PASSWORD: '6e2344c0376873',
    SMTP_FROM_NAME: 'Mtalii',
    SMTP_FROM_EMAIL: 'noreply@Mtalii.com',

    NEXTAUTH_URL: 'https://hotel-booking-app-dusky.vercel.app'
  },

  images : {
    domains: ['res.cloudinary.com']
  }
}
