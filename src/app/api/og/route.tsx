import { ImageResponse } from 'next/og'

export async function GET () {
  const headerStyles = {

  }

  return new ImageResponse(
    (
      <header style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#111'
      }}
      >
        <h1 style={{
          textShadow: '#f3f660 1px 0px 40px',
          fontSize: '8rem',
          fontFamily: 'fantasy',
          fontWeight: 'bold',
          lineHeight: 1,
          color: 'white'
        }}
        >
          XPNS
        </h1>
        <p style={{
          width: '50%',
          fontSize: '1.8rem',
          textAlign: 'center',
          color: 'white'
        }}
        >
          Know where your money goes noting the expenses you have everyday! ✨
        </p>
      </header>
    ),
    {
      width: 1200,
      height: 630
    }
  )
}
