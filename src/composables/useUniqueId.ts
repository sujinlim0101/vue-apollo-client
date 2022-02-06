let UUID = 0

export default function useUniqueID () {
  const getID = () => {
    return UUID++
  }

  return {
    getID
  }
}