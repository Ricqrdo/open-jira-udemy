import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data =
  | {
      message: string;
    }
  | IEntry;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid id' });
  }

  switch (req.method) {
    case 'PUT':
      return updateEntry(req, res);
    case 'GET':
      return getEntryById(req, res);
    case 'DELETE':
      return deleteEntryById(req, res);
    default:
      return res.status(400).json({ message: 'Invalid method' });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.diconnect();
    return res.status(404).json({ message: 'Entry not found' });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status
  } = req.body;

  if (status === entryToUpdate.status)
    return res.status(200).json({ message: 'Status already set' });

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      {
        description,
        status
      },
      { runValidators: true, new: true }
    );

    await db.diconnect();

    return res.status(200).json(updatedEntry!);
  } catch (error: any) {
    await db.diconnect();
    console.log(error);

    return res.status(500).json({ message: error.errors.status.message });
  }
};

const getEntryById = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  await db.connect();

  const entry = await Entry.findById(id);

  if (!entry) {
    await db.diconnect();
    return res.status(404).json({ message: 'Entry not found' });
  }

  try {
    await db.diconnect();

    return res.status(200).json(entry);
  } catch (error: any) {
    await db.diconnect();
    console.log(error);

    return res.status(500).json({ message: error.errors.status.message });
  }
};

const deleteEntryById = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  await db.connect();

  const entry = await Entry.findByIdAndDelete(id);

  if (!entry) {
    await db.diconnect();
    return res.status(404).json({ message: 'Entry not found' });
  }

  try {
    await db.diconnect();

    return res.status(200).json(entry);
  } catch (error: any) {
    await db.diconnect();
    console.log(error);

    return res.status(500).json({ message: error.errors.status.message });
  }
};
