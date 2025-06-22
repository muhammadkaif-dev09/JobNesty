const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-8 text-center py-6">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()}{" "}
        <a
          href="https://kaif.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          JobNesty
        </a>
        . All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
