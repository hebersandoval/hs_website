// Get all post on index page
$(() => {
  bindClickHandlers();
  getNextProject();
  getPreviousProject();
});

const bindClickHandlers = () => {
  $(".all-projects").on('click', (e) => {
    e.preventDefault();
    history.pushState(null, null, "")
    getProjects();
  });
}

// gets all posts
const getProjects = () => {
  fetch(`/portfolio.json`)
    .then((res) => res.json())
    .then(projects => {
      // clear existing content
      $("#projects-container").html("");
      projects.forEach((project) => {
        let newProject = new Project(project);
        // instance of Project has prototype method available
        let projectHtml = newProject.formatIndex();
        $("#projects-container").append(projectHtml);
      });
    });
}

// Get the next project on the show page
const getNextProject = () => {
  $(".js-next-proj").on("click", function(e) {
    e.preventDefault();
    var nextId = parseInt($(".js-next-proj").attr("data-id")) + 1;
    console.log(nextId)
    history.pushState(null, null, "" + nextId)
    $.get("/projects/" + nextId + ".json", function(data) {
      // get project
      var project = data;
      $(".project-title").text(project["title"]);
      $(".project-description").text(project["description"]);
      $(".project-created").text(project["created_at"]);
      // re-set the id to current on the link
      $(".js-next-proj").attr("data-id", project["id"]);
    });
  });
}

// Get the previous project on the show page
const getPreviousProject = () => {
  $(".js-prev-proj").on("click", function(e) {
    e.preventDefault();
    var prevId = parseInt($(".js-next-proj").attr("data-id")) - 1;
    console.log(prevId)
    history.pushState(null, null, "" + prevId)
    $.get("/projects/" + prevId + ".json", function(data) {
      // get project
      var project = data;
      $(".project-title").text(project["title"]);
      $(".project-description").text(project["description"]);
      $(".project-created").text(project["created_at"]);
      // re-set the id to current on the link
      $(".js-next-proj").attr("data-id", project["id"]);
    });
  });
}

// Constructor function
function Project(project) {
  this.id = project.id;
  this.title = project.title;
  this.description = project.description;
  this.tags = project.tags;
}

// Can't use => function on prototype methods
Project.prototype.formatIndex = function(){
  let projectHtml = `
    <div class="portfolio-items">

      <div class="col-md-4 col-sm-6 work-grid wordpress graphic">
        <div class="portfolio-content">
          <img class="img-responsive" src="/assets/works/portfolio-1.jpg" alt="">
          <div class="portfolio-overlay">
            <a href="/projects/${this.id}"><i class="fa fa-camera-retro"></i></a>
            <h5>${this.title}</h5>
            <p>${this.description}</p>
          </div>
        </div>
      </div>

    </div>
  `
  return projectHtml;
}
