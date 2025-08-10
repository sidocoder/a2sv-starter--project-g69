const styles = {
  container: "flex flex-col min-h-screen justify-between bg-gray-100",

  header: "w-full px-15 py-4 flex items-center justify-between bg-white shadow",
  nav: "space-x-6 text-sm text-gray-600",
  createAccount: "text-indigo-600 hover:underline font-medium",

  main: "flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8",
  formWrapper: "w-full max-w-md space-y-1 p-8 rounded-md",
  formLogo: "flex justify-center ",
  formTitle: "mt-5 text-center text-3xl font-bold text-gray-900  ",
  formLinks: "text-center text-sm text-gray-500 pb-7",

  input: "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
  options: "flex items-center justify-between text-sm text-gray-600 py-7",
  remember: "flex items-center text-sm text-gray-600",
  submit: "w-full flex relative justify-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer ",

  footer: "bg-gray-800 text-gray-300 text-sm py-8 px-6",
  footerGrid: "max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6",
  footerSectionTitle: "font-semibold text-white mb-2",
  footerLogo: "font-bold text-white mb-2",
  copyright: "mt-6 text-center text-xs text-gray-400",
};

export default styles;
