
/**
 * Convert the version number attribute to a standard format. The version attribute is
 * expected to be in the format 'version-n.n', where each number in 'n.n' may be from
 * 1 to 3 digits long. Since a string sort is used the version number must be coersed
 * to be in the format 'nnn.nnn' to ensure version attributes are sorted in the correct
 * sequence.
 *
 * @param {any} versionString In the format 'version-n.n'.
 * @returns {String} A new version number string in the format 'version-nnn.nnn'
 */
const convertVersionNo = (versionString) => {
  const versionParts = versionString.split('-');
  const originalVersionNo = versionParts[1].split('.');
  const majorVersionNo = originalVersionNo[0].padStart(3, '0');
  const minorVersionNo = originalVersionNo[1].padStart(3, '0');
  return `${versionParts[0].toLowerCase()}-${majorVersionNo}.${minorVersionNo}`;
};

/**
 * Perform and ascending string comparison on keys to be sorted
 */
const ascStringComparator = (firstKey, secondKey) => {
  const firstValue = convertVersionNo(firstKey);   // ignore upper and lowercase
  const secondValue = convertVersionNo(secondKey); // ignore upper and lowercase
  if (firstValue < secondValue) {
    return -1;
  }
  if (firstValue > secondValue) {
    return 1;
  }
  return 0;                                    // values are equal to one another
};

/**
 * Collapse all versions of a curriculum object into a single JSON object. Merge each set
 * of attributes from the oldest version to the most recent version. This results in a
 * single JSON object that contains the modification from all versions of the path.
 *
 * @returns {String[]} - A collapsed JSON object containing the combined attributes
 * from all versions
 */
const collapseVersions = currentJSON =>
  Object.keys(currentJSON)
    .sort(ascStringComparator)
    .reduce((combinedJSON, currentIndex) =>
      ({ ...combinedJSON, ...currentJSON[currentIndex] }), []);

export { collapseVersions };
