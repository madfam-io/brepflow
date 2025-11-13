-- BrepFlow Database Initialization Script
-- PostgreSQL schema for collaboration and session persistence

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Collaboration sessions table
CREATE TABLE IF NOT EXISTS collaboration_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    active BOOLEAN DEFAULT true,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Session users table
CREATE TABLE IF NOT EXISTS session_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES collaboration_sessions(id) ON DELETE CASCADE,
    user_id VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255),
    user_color VARCHAR(7) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('owner', 'editor', 'viewer')),
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Graph operations history
CREATE TABLE IF NOT EXISTS graph_operations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES collaboration_sessions(id) ON DELETE CASCADE,
    user_id VARCHAR(255) NOT NULL,
    operation_type VARCHAR(50) NOT NULL,
    operation_data JSONB NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    reversible BOOLEAN DEFAULT true,
    inverse_operation JSONB
);

-- Node locks table
CREATE TABLE IF NOT EXISTS node_locks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES collaboration_sessions(id) ON DELETE CASCADE,
    node_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    acquired_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    UNIQUE(session_id, node_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_sessions_project_id ON collaboration_sessions(project_id);
CREATE INDEX IF NOT EXISTS idx_sessions_active ON collaboration_sessions(active);
CREATE INDEX IF NOT EXISTS idx_session_users_session ON session_users(session_id);
CREATE INDEX IF NOT EXISTS idx_operations_session ON graph_operations(session_id);
CREATE INDEX IF NOT EXISTS idx_operations_timestamp ON graph_operations(timestamp);
CREATE INDEX IF NOT EXISTS idx_locks_session ON node_locks(session_id);
CREATE INDEX IF NOT EXISTS idx_locks_expires ON node_locks(expires_at);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at
CREATE TRIGGER update_collaboration_sessions_updated_at
    BEFORE UPDATE ON collaboration_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to clean up expired locks
CREATE OR REPLACE FUNCTION cleanup_expired_locks()
RETURNS void AS $$
BEGIN
    DELETE FROM node_locks WHERE expires_at < CURRENT_TIMESTAMP;
END;
$$ LANGUAGE 'plpgsql';

COMMENT ON TABLE collaboration_sessions IS 'Real-time collaboration session metadata';
COMMENT ON TABLE session_users IS 'Users participating in collaboration sessions';
COMMENT ON TABLE graph_operations IS 'Operational transform history for graph edits';
COMMENT ON TABLE node_locks IS 'Exclusive edit locks on graph nodes';
