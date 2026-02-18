-- project_board table (Timeline & Phases)
CREATE TABLE IF NOT EXISTS project_board (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE project_board ENABLE ROW LEVEL SECURITY;

CREATE POLICY "project_board_read_own" ON project_board
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "project_board_insert_own" ON project_board
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "project_board_update_own" ON project_board
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "project_board_delete_own" ON project_board
  FOR DELETE USING (auth.uid() = user_id);

DROP TRIGGER IF EXISTS project_board_updated_at ON project_board;
CREATE TRIGGER project_board_updated_at
  BEFORE UPDATE ON project_board
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- phases (reference data per project or global)
CREATE TABLE IF NOT EXISTS project_phase (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  "order" INT NOT NULL DEFAULT 0
);

INSERT INTO project_phase (id, name, "order") VALUES
  ('kickoff', 'Kickoff', 0),
  ('concept', 'Concept', 1),
  ('schematic', 'Schematic', 2),
  ('dd', 'DD', 3),
  ('permitting', 'Permitting', 4),
  ('ca', 'CA', 5),
  ('handover', 'Handover', 6)
ON CONFLICT (id) DO NOTHING;

-- milestones
CREATE TABLE IF NOT EXISTS project_milestone (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES project_board(id) ON DELETE CASCADE,
  phase_id TEXT NOT NULL REFERENCES project_phase(id),
  title TEXT NOT NULL,
  due_date DATE NOT NULL,
  assignee_id UUID REFERENCES auth.users(id),
  status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'complete', 'overdue')),
  "order" INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE project_milestone ENABLE ROW LEVEL SECURITY;

CREATE POLICY "project_milestone_select" ON project_milestone
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM project_board pb WHERE pb.id = project_id AND pb.user_id = auth.uid())
  );
CREATE POLICY "project_milestone_insert" ON project_milestone
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM project_board pb WHERE pb.id = project_id AND pb.user_id = auth.uid())
  );
CREATE POLICY "project_milestone_update" ON project_milestone
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM project_board pb WHERE pb.id = project_id AND pb.user_id = auth.uid())
  );
CREATE POLICY "project_milestone_delete" ON project_milestone
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM project_board pb WHERE pb.id = project_id AND pb.user_id = auth.uid())
  );

DROP TRIGGER IF EXISTS project_milestone_updated_at ON project_milestone;
CREATE TRIGGER project_milestone_updated_at
  BEFORE UPDATE ON project_milestone
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- decisions (Decision Log)
CREATE TABLE IF NOT EXISTS decisions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES project_board(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  options JSONB NOT NULL DEFAULT '[]',
  required_approvers TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'approved', 'changes_requested')),
  version INT NOT NULL DEFAULT 1,
  published_at TIMESTAMPTZ,
  approved_at TIMESTAMPTZ,
  approved_by UUID REFERENCES auth.users(id),
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE decisions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "decisions_select" ON decisions
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM project_board pb WHERE pb.id = project_id AND pb.user_id = auth.uid())
  );
CREATE POLICY "decisions_insert" ON decisions
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM project_board pb WHERE pb.id = project_id AND pb.user_id = auth.uid())
  );
CREATE POLICY "decisions_update" ON decisions
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM project_board pb WHERE pb.id = project_id AND pb.user_id = auth.uid())
  );
CREATE POLICY "decisions_delete" ON decisions
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM project_board pb WHERE pb.id = project_id AND pb.user_id = auth.uid())
  );

DROP TRIGGER IF EXISTS decisions_updated_at ON decisions;
CREATE TRIGGER decisions_updated_at
  BEFORE UPDATE ON decisions
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
