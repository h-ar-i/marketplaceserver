const projects = require('../Models/projectModels')

exports.addProject = async (req, res) => {
    console.log("inside Add project");
    console.log(req.payload);
    console.log(req.body);
     console.log(req.file);
    // console.log(files);
    const { title, location, overview } = req.body
    const userId = req.payload
     const projectImage = req.file.filename
    // const projectImage = req.files.map(file => file.filename);
    try {
        const exisitingProject = await projects.findOne({ overview })
        if (exisitingProject) {
            res.status(406).json("project already exists")
        } else {
            const newproject = new projects({
                title, location, overview, projectImage, userId
            })
            await newproject.save()
            res.status(200).json(newproject)
        }
    } catch (err) {
        res.status(401).json(err)

    }
}

//get all projects
exports.getAllProjects = async (req, res) => {
    const searchKey = req.query.search
    const query = {
        title: {
            $regex: searchKey, $options: 'i'
        }
    }
    try {
        const allProjects = await projects.find(query)
        res.status(200).json(allProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}

//get user projects
exports.getUserProjects = async (req, res) => {
    const userId = req.payload
    try {
        const userProjects = await projects.find({ userId })
        res.status(200).json(userProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}

// //get home projects
exports.getHomeProjects = async (req, res) => {
    const userId = req.payload
    try {
        const homeProjects = await projects.find().limit(3)
        res.status(200).json(homeProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.editProject = async (req, res) => {
    console.log("inside edit project");
    const { pid } = req.params
    const userId = req.payload
    const { title, location, overview, projectImage } = req.body
    const uploadImage = req.file ? req.file.filename : projectImage
    try {
        const updatedProject = await projects.findByIdAndUpdate({ _id: pid }, {
            title, location, overview, projectImage: uploadImage, userId
        }, { new: true })
        await updatedProject.save()
        res.status(200).json(updatedProject)
    } catch (err) {
        res.status(401).json(err)
    }
}


//remove
exports.removeProject = async (req,res)=>{
    console.log("inside remove project");
    const {pid} = req.params
    try{
        const projectDetails = await projects.findByIdAndDelete({_id:pid})
        res.status(200).json(projectDetails)
    }catch(err){
        res.status(401).json(err)
    }
}
