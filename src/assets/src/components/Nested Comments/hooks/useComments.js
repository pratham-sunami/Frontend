import React, { useState } from 'react'

const useComments = (CommentsData) => {

  const [comments , setComments] = useState(CommentsData.comments)

  const addComment = (parentId , value) => {

    let newId = Date.now()

    const newComment = {
        id:newId,
        parentId,
        value,
        children : []
    }

    setComments((prev) => {
        const updatedComments = {...prev , [newId] : newComment}
        updatedComments[parentId].children.push(newId)
        return updatedComments
    })
  }

  const deleteComment = (id) => {
    const parentId = comments[id].parentId;

    setComments((prev) => {
        const updatedComments = {...prev}
        if(parentId){
            updatedComments[parentId].children = updatedComments[parentId].children.filter((filterId) => filterId !== id)
        }

        const queue = [id]
        while(queue.length > 0){
            const nodeToDelete = queue.shift()
            queue.push(...updatedComments[nodeToDelete].children)
            delete updatedComments[nodeToDelete]
        }

        return updatedComments
    })
  }

  return {comments , addComment , deleteComment}
}

export default useComments
