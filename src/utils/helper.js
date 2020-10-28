export const findProfile = (arr, profileId) => {
  return arr.find((profile) => {
    return profile === profileId;
  })
}
