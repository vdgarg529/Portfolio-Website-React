const SectionWrapper = (Component, idName) => 
    function HOC() {
      return (
        <section id={idName} className="sm:px-16 px-6 sm:py-16 py-10 max-w-7xl mx-auto relative z-0">
          <Component />
        </section>
      )
    }
  
  export default SectionWrapper;