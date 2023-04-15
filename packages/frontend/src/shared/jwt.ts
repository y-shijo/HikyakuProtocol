interface HikyakuJwtPayload {
  iss: string
  sub: string
  type: 'email'
  nonce: number
  exp: number
}

export async function parseJwtAndVerify(token: string): Promise<HikyakuJwtPayload> {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    Buffer.from(base64, 'base64')
      .toString()
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join(''),
  )

  const payload = JSON.parse(jsonPayload)
  if (payload.type !== 'email') {
    throw new Error('Invalid token type')
  } else if (!payload.iss || !payload.sub || !payload.nonce || !payload.exp) {
    throw new Error('Invalid token payload')
  }
  return {
    iss: payload.iss,
    sub: payload.sub,
    type: payload.type,
    nonce: payload.nonce,
    exp: payload.exp,
  }
}
