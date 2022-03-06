const getUserId = user => user?.result?.googleId || user?.result?._id

export default getUserId
