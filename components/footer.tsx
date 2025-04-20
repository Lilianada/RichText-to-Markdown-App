
const Footer = () => {
    return (
      <footer className="mt-auto py-6 border-t border-mark-200 dark:border-mark-800 bg-mark-200 dark:bg-mark-800">
        <div className="text-center text-xs text-mark-500 dark:text-mark-400">
          <p>Text to Markdown Converter &copy; {new Date().getFullYear()} - A helpful tool for web developers</p>
          <p className="mt-1">
            A product of{" "}
            <a
              href="https://lilyslab.xyz"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4 text-mark-600 dark:text-mark-300 hover:text-mark-900 dark:hover:text-mark-100"
            >
              Lily&#39;s Lab
            </a>
            . The source code is available on{" "}
            <a
              href="https://github.com/lilianada/text-to-markdown-app/fork"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4 text-mark-600 dark:text-mark-300 hover:text-mark-900 dark:hover:text-mark-100"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </footer>
    )
  }
  
  export default Footer