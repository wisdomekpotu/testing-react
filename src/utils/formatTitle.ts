export const formatTitle = (title: string): string => {
  console.log('Input:', title); // Log the input
  const formatted = title
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  console.log('Formatted:', formatted); // Log the output
  return formatted;
};
